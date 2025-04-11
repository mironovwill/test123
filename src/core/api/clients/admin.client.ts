import { APIResponse } from '@playwright/test';
import { ApiClient } from '@core/helpers/api-helpers/api.client';
import { adminApiConfig } from 'src/config/api/admin.api.config';
import {
  CertificateResponse,
  CertificateTemplateResponse,
  CertificateDto,
  DepartmentDto,
  FunctionDto,
  RewardDto,
  DepartmentResponse,
  FunctionResponse,
  LoginDto,
  LoginResponse,
  RewardResponse,
  UserDto,
  UserResponse,
  AuthorDto,
  AuthorResponse,
} from '../types';

type TopicCategoryResponse = {
  id: number;
  name: string;
  [key: string]: unknown;
};

type TopicLevelResponse = {
  id: number;
  name: string;
};

type LanguageResponse = {
  id: number;
  name: string;
  [key: string]: unknown;
};

type AuthorsResponse = {
  id: number;
  name: string;
  visible: boolean;
  [key: string]: unknown;
};

type TopicResponse = {
  id: number;
  [key: string]: unknown;
};

type BookAddress = {
  id: number;
  address: string;
};

type BookAddressResponse = {
  content: BookAddress[];
};

type TagResponse = {
  id: number;
  name: string;
  [key: string]: unknown;
};

type Skill = {
  id: number;
  name: string;
  [key: string]: unknown;
};

type SkillResponse = {
  content: Skill[];
};

/**
 * Клиент для работы с административным API.
 * Предоставляет методы для создания, удаления и управления сущностями.
 */
export class AdminApiClient extends ApiClient {
  constructor() {
    super(adminApiConfig.baseUrl);
  }

  /**
   * Создает новую функцию.
   * @param functionInternal - Данные для создания функции.
   * @returns {FunctionResponse} Созданная функция.
   */
  async createFunction(functionInternal: FunctionDto): Promise<FunctionResponse> {
    return await this.post(adminApiConfig.endpoints.functions.base, functionInternal);
  }

  /**
   * Удаляет функцию по её ID.
   * @param functionId - ID функции.
   * @returns Ответ API.
   */
  async deleteFunctionById(functionId: number): Promise<APIResponse> {
    return await this.delete(adminApiConfig.endpoints.functions.byId(functionId));
  }

  /**
   * Создает нового автора.
   * @param author - Данные для создания автора.
   * @returns {AuthorDto} Созданный автор.
   */
  async createAuthor(author: AuthorDto): Promise<AuthorResponse> {
    return await this.post(adminApiConfig.endpoints.authors.base, author);
  }

  /**
   * Удаляет автора по его ID.
   * @param id - ID автора.
   * @returns Ответ API.
   */
  async deleteAuthor(id: number): Promise<APIResponse> {
    return await this.delete(adminApiConfig.endpoints.authors.byId(id));
  }

  /**
   * Создает новый отдел.
   * @param department - Данные для создания отдела.
   * @returns {DepartmentDto} Созданный отдел.
   */
  async createDepartment(department: DepartmentDto): Promise<DepartmentResponse> {
    return await this.post(adminApiConfig.endpoints.departments.base, department);
  }

  /**
   * Удаляет отдел по его ID.
   * @param departmentId - ID отдела.
   * @returns Ответ API.
   */
  async deleteDepartmentById(departmentId: number): Promise<APIResponse> {
    return await this.delete(adminApiConfig.endpoints.departments.byId(departmentId));
  }

  /**
   * Создает новую награду.
   * @param reward - Данные для создания награды.
   * @returns {RewardResponse} Созданная награда.
   */
  async createReward(reward: RewardDto): Promise<RewardResponse> {
    return await this.post(adminApiConfig.endpoints.rewards.base, reward);
  }

  /**
   * Удаляет награду по её ID.
   * @param rewardId - ID награды.
   * @returns Ответ API.
   */
  async deleteRewardById(rewardId: number): Promise<RewardResponse> {
    return await this.delete(adminApiConfig.endpoints.rewards.byId(rewardId));
  }

  /**
   * Получает список шаблонов сертификатов.
   * @returns {CertificateTemplateResponse[]} Массив шаблонов сертификатов.
   */
  async getCertificateTemplates(): Promise<CertificateTemplateResponse[]> {
    return await this.get(adminApiConfig.endpoints.certificates.template);
  }

  /**
   * Создает новый сертификат.
   * @param certificate - Данные для создания сертификата.
   * @returns {CertificateResponse} Созданный сертификат.
   */
  async createCertificate(certificate: CertificateDto): Promise<CertificateResponse> {
    return await this.post(adminApiConfig.endpoints.certificates.base, certificate, {}, 201);
  }

  /**
   * Удаляет сертификат по его ID.
   * @param certificateId - ID сертификата.
   * @returns Ответ API.
   */
  async deleteCertificateById(certificateId: number): Promise<APIResponse> {
    return await this.delete(adminApiConfig.endpoints.certificates.byId(certificateId));
  }

  /**
   * Выполняет вход пользователя в систему.
   * @param loginData - Данные для входа.
   * @returns {LoginResponse} Ответ с данными авторизации.
   */
  async login(loginData: LoginDto): Promise<LoginResponse> {
    return await this.post(adminApiConfig.endpoints.auth.login, loginData);
  }

  /**
   * Блокирует вход пользователя по его ID.
   * @param id - ID пользователя.
   * @returns Ответ API.
   */
  async lockUserLogin(id: number): Promise<APIResponse> {
    return await this.put(adminApiConfig.endpoints.students.lockedForLogin, {
      id,
      lock: true,
    });
  }

  /**
   * Создает нового пользователя.
   * @param user - Данные для создания пользователя.
   * @returns {UserResponse} Созданный пользователь.
   */
  async createUser(user: UserDto): Promise<UserResponse> {
    return await this.post(adminApiConfig.endpoints.auth.register, user);
  }

  /**
   * Удаляет тему по её ID.
   * @param topicId - ID топика.
   * @returns Ответ API.
   */
  async deleteTopicById(topicId: number): Promise<APIResponse> {
    return await this.delete(adminApiConfig.endpoints.topics.byId(topicId));
  }

  /**
   * Получает список всех категорий.
   * @returns {TopicCategoryResponse[]} Массив категорий.
   */
  async getTopicCategories(): Promise<TopicCategoryResponse[]> {
    return await this.get(adminApiConfig.endpoints.topics.category);
  }

  /**
   * Получает список всех уровней.
   * @returns {TopicLevelResponse[]} Массив уровней.
   */
  async getTopicLevels(): Promise<TopicLevelResponse[]> {
    return await this.get(adminApiConfig.endpoints.topics.level);
  }

  /**
   * Получает список всех языков.
   * @returns {LanguageResponse[]} Массив языков.
   */
  async getLanguages(): Promise<LanguageResponse[]> {
    return await this.get(adminApiConfig.endpoints.language.base);
  }

  /**
   * Получает список всех авторов.
   * @returns {AuthorsResponse[]} Массив авторов.
   */
  async getAuthors(): Promise<AuthorsResponse[]> {
    return await this.get(adminApiConfig.endpoints.authors.base);
  }

  async createTopic(topic: Record<string, unknown>): Promise<TopicResponse> {
    return await this.post(adminApiConfig.endpoints.topics.base, topic);
  }

  async changeTopicVisibility(topicId: number, visible?: boolean): Promise<APIResponse> {
    return await this.put(adminApiConfig.endpoints.topics.visibility(topicId, visible));
  }

  async getBooksAddress(): Promise<BookAddress[]> {
    const response = await this.get<BookAddressResponse>(adminApiConfig.endpoints.book.address);
    return response.content;
  }

  async getTags(): Promise<TagResponse[]> {
    return await this.get(adminApiConfig.endpoints.tags.base);
  }

  async getSkills(): Promise<Skill[]> {
    const response = await this.get<SkillResponse>(adminApiConfig.endpoints.skills.base);
    return response.content;
  }

  async getUserPositions(): Promise<string[]> {
    return await this.get(adminApiConfig.endpoints.user.position);
  }

  async getUserDepartments(): Promise<string[]> {
    return await this.get(adminApiConfig.endpoints.user.department);
  }

  async deleteBlockById(blockId: number): Promise<APIResponse> {
    return await this.delete(adminApiConfig.endpoints.block.byId(blockId));
  }
}
