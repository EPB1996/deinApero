package ch.meinapero.web.rest;

import static ch.meinapero.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;

import ch.meinapero.IntegrationTest;
import ch.meinapero.domain.PackageType;
import ch.meinapero.repository.PackageTypeRepository;
import ch.meinapero.service.PackageTypeService;
import java.math.BigDecimal;
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
 * Integration tests for the {@link PackageTypeResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class PackageTypeResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_PRICE = new BigDecimal(1);
    private static final BigDecimal UPDATED_PRICE = new BigDecimal(2);

    private static final String ENTITY_API_URL = "/api/package-types";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    @Autowired
    private PackageTypeRepository packageTypeRepository;

    @Mock
    private PackageTypeRepository packageTypeRepositoryMock;

    @Mock
    private PackageTypeService packageTypeServiceMock;

    @Autowired
    private WebTestClient webTestClient;

    private PackageType packageType;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PackageType createEntity() {
        PackageType packageType = new PackageType().name(DEFAULT_NAME).description(DEFAULT_DESCRIPTION).price(DEFAULT_PRICE);
        return packageType;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PackageType createUpdatedEntity() {
        PackageType packageType = new PackageType().name(UPDATED_NAME).description(UPDATED_DESCRIPTION).price(UPDATED_PRICE);
        return packageType;
    }

    @BeforeEach
    public void initTest() {
        packageTypeRepository.deleteAll().block();
        packageType = createEntity();
    }

    @Test
    void createPackageType() throws Exception {
        int databaseSizeBeforeCreate = packageTypeRepository.findAll().collectList().block().size();
        // Create the PackageType
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(packageType))
            .exchange()
            .expectStatus()
            .isCreated();

        // Validate the PackageType in the database
        List<PackageType> packageTypeList = packageTypeRepository.findAll().collectList().block();
        assertThat(packageTypeList).hasSize(databaseSizeBeforeCreate + 1);
        PackageType testPackageType = packageTypeList.get(packageTypeList.size() - 1);
        assertThat(testPackageType.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPackageType.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testPackageType.getPrice()).isEqualByComparingTo(DEFAULT_PRICE);
    }

    @Test
    void createPackageTypeWithExistingId() throws Exception {
        // Create the PackageType with an existing ID
        packageType.setId("existing_id");

        int databaseSizeBeforeCreate = packageTypeRepository.findAll().collectList().block().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(packageType))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the PackageType in the database
        List<PackageType> packageTypeList = packageTypeRepository.findAll().collectList().block();
        assertThat(packageTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = packageTypeRepository.findAll().collectList().block().size();
        // set the field null
        packageType.setName(null);

        // Create the PackageType, which fails.

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(packageType))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<PackageType> packageTypeList = packageTypeRepository.findAll().collectList().block();
        assertThat(packageTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkPriceIsRequired() throws Exception {
        int databaseSizeBeforeTest = packageTypeRepository.findAll().collectList().block().size();
        // set the field null
        packageType.setPrice(null);

        // Create the PackageType, which fails.

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(packageType))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<PackageType> packageTypeList = packageTypeRepository.findAll().collectList().block();
        assertThat(packageTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void getAllPackageTypesAsStream() {
        // Initialize the database
        packageTypeRepository.save(packageType).block();

        List<PackageType> packageTypeList = webTestClient
            .get()
            .uri(ENTITY_API_URL)
            .accept(MediaType.APPLICATION_NDJSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentTypeCompatibleWith(MediaType.APPLICATION_NDJSON)
            .returnResult(PackageType.class)
            .getResponseBody()
            .filter(packageType::equals)
            .collectList()
            .block(Duration.ofSeconds(5));

        assertThat(packageTypeList).isNotNull();
        assertThat(packageTypeList).hasSize(1);
        PackageType testPackageType = packageTypeList.get(0);
        assertThat(testPackageType.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPackageType.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testPackageType.getPrice()).isEqualByComparingTo(DEFAULT_PRICE);
    }

    @Test
    void getAllPackageTypes() {
        // Initialize the database
        packageTypeRepository.save(packageType).block();

        // Get all the packageTypeList
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
            .value(hasItem(packageType.getId()))
            .jsonPath("$.[*].name")
            .value(hasItem(DEFAULT_NAME))
            .jsonPath("$.[*].description")
            .value(hasItem(DEFAULT_DESCRIPTION))
            .jsonPath("$.[*].price")
            .value(hasItem(sameNumber(DEFAULT_PRICE)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllPackageTypesWithEagerRelationshipsIsEnabled() {
        when(packageTypeServiceMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=true").exchange().expectStatus().isOk();

        verify(packageTypeServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllPackageTypesWithEagerRelationshipsIsNotEnabled() {
        when(packageTypeServiceMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=false").exchange().expectStatus().isOk();
        verify(packageTypeRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    void getPackageType() {
        // Initialize the database
        packageTypeRepository.save(packageType).block();

        // Get the packageType
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, packageType.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(packageType.getId()))
            .jsonPath("$.name")
            .value(is(DEFAULT_NAME))
            .jsonPath("$.description")
            .value(is(DEFAULT_DESCRIPTION))
            .jsonPath("$.price")
            .value(is(sameNumber(DEFAULT_PRICE)));
    }

    @Test
    void getNonExistingPackageType() {
        // Get the packageType
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingPackageType() throws Exception {
        // Initialize the database
        packageTypeRepository.save(packageType).block();

        int databaseSizeBeforeUpdate = packageTypeRepository.findAll().collectList().block().size();

        // Update the packageType
        PackageType updatedPackageType = packageTypeRepository.findById(packageType.getId()).block();
        updatedPackageType.name(UPDATED_NAME).description(UPDATED_DESCRIPTION).price(UPDATED_PRICE);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, updatedPackageType.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(updatedPackageType))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the PackageType in the database
        List<PackageType> packageTypeList = packageTypeRepository.findAll().collectList().block();
        assertThat(packageTypeList).hasSize(databaseSizeBeforeUpdate);
        PackageType testPackageType = packageTypeList.get(packageTypeList.size() - 1);
        assertThat(testPackageType.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPackageType.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testPackageType.getPrice()).isEqualByComparingTo(UPDATED_PRICE);
    }

    @Test
    void putNonExistingPackageType() throws Exception {
        int databaseSizeBeforeUpdate = packageTypeRepository.findAll().collectList().block().size();
        packageType.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, packageType.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(packageType))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the PackageType in the database
        List<PackageType> packageTypeList = packageTypeRepository.findAll().collectList().block();
        assertThat(packageTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchPackageType() throws Exception {
        int databaseSizeBeforeUpdate = packageTypeRepository.findAll().collectList().block().size();
        packageType.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, UUID.randomUUID().toString())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(packageType))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the PackageType in the database
        List<PackageType> packageTypeList = packageTypeRepository.findAll().collectList().block();
        assertThat(packageTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamPackageType() throws Exception {
        int databaseSizeBeforeUpdate = packageTypeRepository.findAll().collectList().block().size();
        packageType.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(packageType))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the PackageType in the database
        List<PackageType> packageTypeList = packageTypeRepository.findAll().collectList().block();
        assertThat(packageTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdatePackageTypeWithPatch() throws Exception {
        // Initialize the database
        packageTypeRepository.save(packageType).block();

        int databaseSizeBeforeUpdate = packageTypeRepository.findAll().collectList().block().size();

        // Update the packageType using partial update
        PackageType partialUpdatedPackageType = new PackageType();
        partialUpdatedPackageType.setId(packageType.getId());

        partialUpdatedPackageType.description(UPDATED_DESCRIPTION).price(UPDATED_PRICE);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedPackageType.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedPackageType))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the PackageType in the database
        List<PackageType> packageTypeList = packageTypeRepository.findAll().collectList().block();
        assertThat(packageTypeList).hasSize(databaseSizeBeforeUpdate);
        PackageType testPackageType = packageTypeList.get(packageTypeList.size() - 1);
        assertThat(testPackageType.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPackageType.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testPackageType.getPrice()).isEqualByComparingTo(UPDATED_PRICE);
    }

    @Test
    void fullUpdatePackageTypeWithPatch() throws Exception {
        // Initialize the database
        packageTypeRepository.save(packageType).block();

        int databaseSizeBeforeUpdate = packageTypeRepository.findAll().collectList().block().size();

        // Update the packageType using partial update
        PackageType partialUpdatedPackageType = new PackageType();
        partialUpdatedPackageType.setId(packageType.getId());

        partialUpdatedPackageType.name(UPDATED_NAME).description(UPDATED_DESCRIPTION).price(UPDATED_PRICE);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedPackageType.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedPackageType))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the PackageType in the database
        List<PackageType> packageTypeList = packageTypeRepository.findAll().collectList().block();
        assertThat(packageTypeList).hasSize(databaseSizeBeforeUpdate);
        PackageType testPackageType = packageTypeList.get(packageTypeList.size() - 1);
        assertThat(testPackageType.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPackageType.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testPackageType.getPrice()).isEqualByComparingTo(UPDATED_PRICE);
    }

    @Test
    void patchNonExistingPackageType() throws Exception {
        int databaseSizeBeforeUpdate = packageTypeRepository.findAll().collectList().block().size();
        packageType.setId(UUID.randomUUID().toString());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, packageType.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(packageType))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the PackageType in the database
        List<PackageType> packageTypeList = packageTypeRepository.findAll().collectList().block();
        assertThat(packageTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchPackageType() throws Exception {
        int databaseSizeBeforeUpdate = packageTypeRepository.findAll().collectList().block().size();
        packageType.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, UUID.randomUUID().toString())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(packageType))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the PackageType in the database
        List<PackageType> packageTypeList = packageTypeRepository.findAll().collectList().block();
        assertThat(packageTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamPackageType() throws Exception {
        int databaseSizeBeforeUpdate = packageTypeRepository.findAll().collectList().block().size();
        packageType.setId(UUID.randomUUID().toString());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(packageType))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the PackageType in the database
        List<PackageType> packageTypeList = packageTypeRepository.findAll().collectList().block();
        assertThat(packageTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deletePackageType() {
        // Initialize the database
        packageTypeRepository.save(packageType).block();

        int databaseSizeBeforeDelete = packageTypeRepository.findAll().collectList().block().size();

        // Delete the packageType
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, packageType.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        List<PackageType> packageTypeList = packageTypeRepository.findAll().collectList().block();
        assertThat(packageTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
