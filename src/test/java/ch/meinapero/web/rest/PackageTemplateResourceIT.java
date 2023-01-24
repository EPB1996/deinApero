package ch.meinapero.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;

import ch.meinapero.IntegrationTest;
import ch.meinapero.domain.PackageTemplate;
import ch.meinapero.repository.PackageTemplateRepository;
import ch.meinapero.service.PackageTemplateService;
import java.time.Duration;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Integration tests for the {@link PackageTemplateResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class PackageTemplateResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/package-templates";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private PackageTemplateRepository packageTemplateRepository;

    @Mock
    private PackageTemplateRepository packageTemplateRepositoryMock;

    @Mock
    private PackageTemplateService packageTemplateServiceMock;

    @Autowired
    private WebTestClient webTestClient;

    private PackageTemplate packageTemplate;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PackageTemplate createEntity() {
        PackageTemplate packageTemplate = new PackageTemplate().name(DEFAULT_NAME);
        return packageTemplate;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PackageTemplate createUpdatedEntity() {
        PackageTemplate packageTemplate = new PackageTemplate().name(UPDATED_NAME);
        return packageTemplate;
    }

    @BeforeEach
    public void initTest() {
        packageTemplateRepository.deleteAll().block();
        packageTemplate = createEntity();
    }

    @Test
    void createPackageTemplate() throws Exception {
        int databaseSizeBeforeCreate = packageTemplateRepository.findAll().collectList().block().size();
        // Create the PackageTemplate
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(packageTemplate))
            .exchange()
            .expectStatus()
            .isCreated();

        // Validate the PackageTemplate in the database
        List<PackageTemplate> packageTemplateList = packageTemplateRepository.findAll().collectList().block();
        assertThat(packageTemplateList).hasSize(databaseSizeBeforeCreate + 1);
        PackageTemplate testPackageTemplate = packageTemplateList.get(packageTemplateList.size() - 1);
        assertThat(testPackageTemplate.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    void createPackageTemplateWithExistingId() throws Exception {
        // Create the PackageTemplate with an existing ID
        packageTemplate.setId("existing_id");

        int databaseSizeBeforeCreate = packageTemplateRepository.findAll().collectList().block().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(packageTemplate))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the PackageTemplate in the database
        List<PackageTemplate> packageTemplateList = packageTemplateRepository.findAll().collectList().block();
        assertThat(packageTemplateList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = packageTemplateRepository.findAll().collectList().block().size();
        // set the field null
        packageTemplate.setName(null);

        // Create the PackageTemplate, which fails.

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(packageTemplate))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<PackageTemplate> packageTemplateList = packageTemplateRepository.findAll().collectList().block();
        assertThat(packageTemplateList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void getAllPackageTemplatesAsStream() {
        // Initialize the database
        packageTemplateRepository.save(packageTemplate).block();

        List<PackageTemplate> packageTemplateList = webTestClient
            .get()
            .uri(ENTITY_API_URL)
            .accept(MediaType.APPLICATION_NDJSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentTypeCompatibleWith(MediaType.APPLICATION_NDJSON)
            .returnResult(PackageTemplate.class)
            .getResponseBody()
            .filter(packageTemplate::equals)
            .collectList()
            .block(Duration.ofSeconds(5));

        assertThat(packageTemplateList).isNotNull();
        assertThat(packageTemplateList).hasSize(1);
        PackageTemplate testPackageTemplate = packageTemplateList.get(0);
        assertThat(testPackageTemplate.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    void getAllPackageTemplates() {
        // Initialize the database
        packageTemplateRepository.save(packageTemplate).block();

        // Get all the packageTemplateList
        webTestClient
            .get()
            .uri(ENTITY_API_URL + "?sort=id,desc")
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.[*].id")
            .value(hasItem(packageTemplate.getId()))
            .jsonPath("$.[*].name")
            .value(hasItem(DEFAULT_NAME));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllPackageTemplatesWithEagerRelationshipsIsEnabled() {
        when(packageTemplateServiceMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=true").exchange().expectStatus().isOk();

        verify(packageTemplateServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllPackageTemplatesWithEagerRelationshipsIsNotEnabled() {
        when(packageTemplateServiceMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=false").exchange().expectStatus().isOk();
        verify(packageTemplateRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    void getPackageTemplate() {
        // Initialize the database
        packageTemplateRepository.save(packageTemplate).block();

        // Get the packageTemplate
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, packageTemplate.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(packageTemplate.getId()))
            .jsonPath("$.name")
            .value(is(DEFAULT_NAME));
    }

    @Test
    void getNonExistingPackageTemplate() {
        // Get the packageTemplate
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingPackageTemplate() throws Exception {
        // Initialize the database
        packageTemplateRepository.save(packageTemplate).block();

        int databaseSizeBeforeUpdate = packageTemplateRepository.findAll().collectList().block().size();

        // Update the packageTemplate
        PackageTemplate updatedPackageTemplate = packageTemplateRepository.findById(packageTemplate.getId()).block();
        updatedPackageTemplate.name(UPDATED_NAME);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, updatedPackageTemplate.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(updatedPackageTemplate))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the PackageTemplate in the database
        List<PackageTemplate> packageTemplateList = packageTemplateRepository.findAll().collectList().block();
        assertThat(packageTemplateList).hasSize(databaseSizeBeforeUpdate);
        PackageTemplate testPackageTemplate = packageTemplateList.get(packageTemplateList.size() - 1);
        assertThat(testPackageTemplate.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    void putNonExistingPackageTemplate() throws Exception {
        int databaseSizeBeforeUpdate = packageTemplateRepository.findAll().collectList().block().size();
        packageTemplate.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, packageTemplate.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(packageTemplate))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the PackageTemplate in the database
        List<PackageTemplate> packageTemplateList = packageTemplateRepository.findAll().collectList().block();
        assertThat(packageTemplateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchPackageTemplate() throws Exception {
        int databaseSizeBeforeUpdate = packageTemplateRepository.findAll().collectList().block().size();
        packageTemplate.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, UUID.randomUUID().toString())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(packageTemplate))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the PackageTemplate in the database
        List<PackageTemplate> packageTemplateList = packageTemplateRepository.findAll().collectList().block();
        assertThat(packageTemplateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamPackageTemplate() throws Exception {
        int databaseSizeBeforeUpdate = packageTemplateRepository.findAll().collectList().block().size();
        packageTemplate.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(packageTemplate))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the PackageTemplate in the database
        List<PackageTemplate> packageTemplateList = packageTemplateRepository.findAll().collectList().block();
        assertThat(packageTemplateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdatePackageTemplateWithPatch() throws Exception {
        // Initialize the database
        packageTemplateRepository.save(packageTemplate).block();

        int databaseSizeBeforeUpdate = packageTemplateRepository.findAll().collectList().block().size();

        // Update the packageTemplate using partial update
        PackageTemplate partialUpdatedPackageTemplate = new PackageTemplate();
        partialUpdatedPackageTemplate.setId(packageTemplate.getId());

        partialUpdatedPackageTemplate.name(UPDATED_NAME);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedPackageTemplate.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedPackageTemplate))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the PackageTemplate in the database
        List<PackageTemplate> packageTemplateList = packageTemplateRepository.findAll().collectList().block();
        assertThat(packageTemplateList).hasSize(databaseSizeBeforeUpdate);
        PackageTemplate testPackageTemplate = packageTemplateList.get(packageTemplateList.size() - 1);
        assertThat(testPackageTemplate.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    void fullUpdatePackageTemplateWithPatch() throws Exception {
        // Initialize the database
        packageTemplateRepository.save(packageTemplate).block();

        int databaseSizeBeforeUpdate = packageTemplateRepository.findAll().collectList().block().size();

        // Update the packageTemplate using partial update
        PackageTemplate partialUpdatedPackageTemplate = new PackageTemplate();
        partialUpdatedPackageTemplate.setId(packageTemplate.getId());

        partialUpdatedPackageTemplate.name(UPDATED_NAME);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedPackageTemplate.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedPackageTemplate))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the PackageTemplate in the database
        List<PackageTemplate> packageTemplateList = packageTemplateRepository.findAll().collectList().block();
        assertThat(packageTemplateList).hasSize(databaseSizeBeforeUpdate);
        PackageTemplate testPackageTemplate = packageTemplateList.get(packageTemplateList.size() - 1);
        assertThat(testPackageTemplate.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    void patchNonExistingPackageTemplate() throws Exception {
        int databaseSizeBeforeUpdate = packageTemplateRepository.findAll().collectList().block().size();
        packageTemplate.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, packageTemplate.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(packageTemplate))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the PackageTemplate in the database
        List<PackageTemplate> packageTemplateList = packageTemplateRepository.findAll().collectList().block();
        assertThat(packageTemplateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchPackageTemplate() throws Exception {
        int databaseSizeBeforeUpdate = packageTemplateRepository.findAll().collectList().block().size();
        packageTemplate.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, UUID.randomUUID().toString())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(packageTemplate))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the PackageTemplate in the database
        List<PackageTemplate> packageTemplateList = packageTemplateRepository.findAll().collectList().block();
        assertThat(packageTemplateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamPackageTemplate() throws Exception {
        int databaseSizeBeforeUpdate = packageTemplateRepository.findAll().collectList().block().size();
        packageTemplate.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(packageTemplate))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the PackageTemplate in the database
        List<PackageTemplate> packageTemplateList = packageTemplateRepository.findAll().collectList().block();
        assertThat(packageTemplateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deletePackageTemplate() {
        // Initialize the database
        packageTemplateRepository.save(packageTemplate).block();

        int databaseSizeBeforeDelete = packageTemplateRepository.findAll().collectList().block().size();

        // Delete the packageTemplate
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, packageTemplate.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        List<PackageTemplate> packageTemplateList = packageTemplateRepository.findAll().collectList().block();
        assertThat(packageTemplateList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
