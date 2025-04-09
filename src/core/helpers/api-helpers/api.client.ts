import 'dotenv/config';
import { APIRequestContext, APIResponse, expect, request } from '@playwright/test';

export class ApiClient {
  constructor(private baseUrl: string) {}

  /**
   * Проверяет статус ответа от API на соответствие ожидаемому значению.
   * Если статус не совпадает, выводит текст ответа в консоль и выбрасывает ошибку.
   * @param response - Ответ от API, который нужно проверить.s
   * @param expectedStatus - Ожидаемый статус-код ответа (по умолчанию 200).
   * @throws {Error} - Если статус ответа не соответствует ожидаемому.
   */
  private async checkResponseStatus(response: APIResponse, expectedStatus = 200) {
    try {
      expect(response.status(), { message: response.statusText() }).toBe(expectedStatus);
    } catch (error) {
      console.error(await response.text());
      throw error;
    }
  }

  /**
   * Выполняет HTTP-запрос
   * @param {'get' | 'post' | 'put' | 'delete'} method - HTTP-метод
   * @param {string} path - Путь для запроса
   * @param {Object} [options={}] - Дополнительные параметры
   * @param {any} [options.body] - Тело запроса
   * @param {Record<string, string>} [options.headers] - Заголовки
   * @param {number} [options.statusCode] - Ожидаемый статус-код
   * @returns {any} - Промис с результатом запроса типа R.
   */
  private async createRequest<T, R = T>(
    method: 'get' | 'post' | 'put' | 'delete',
    path: string,
    options: {
      body?: T;
      headers?: Record<string, string>;
      statusCode?: number;
    } = {},
  ): Promise<R> {
    const { body, headers = {}, statusCode } = options;
    const url = this.getFullUrl(path);

    const apiRequest: APIRequestContext = await request.newContext({
      baseURL: url,
      extraHTTPHeaders: {
        Authorization: process.env.BEARER_TOKEN!,
      },
      ignoreHTTPSErrors: true,
    });

    const requestOptions = {
      data: body,
      headers,
    };

    const response = await apiRequest[method](url, requestOptions);

    await this.checkResponseStatus(response, statusCode);

    const text = await response.text();
    if (!text) return {} as R;
    return JSON.parse(text);
  }

  /**
   * Получение полного URL для запроса на сервер
   * @param {string} path - Путь для формирования URL
   * @returns {string} Полный URL для запроса на сервер
   */
  private getFullUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }

  /**
   * Выполняет POST-запрос.
   * @param path - Путь для запроса.
   * @param body - Тело запроса (опционально).
   * @param headers - Заголовки запроса (опционально).
   * @param statusCode - Ожидаемый статус-код ответа (опционально).
   * @returns Промис с результатом запроса типа R.
   */
  async post<T, R = T>(
    path: string,
    body?: T,
    headers?: Record<string, string>,
    statusCode?: number,
  ): Promise<R> {
    return this.createRequest<T, R>('post', path, { body, headers, statusCode });
  }

  /**
   * Выполняет PUT-запрос.
   * @param path - Путь для запроса.
   * @param body - Тело запроса (опционально).
   * @param headers - Заголовки запроса (опционально).
   * @param statusCode - Ожидаемый статус-код ответа (опционально).
   * @returns Промис с результатом запроса типа R.
   */
  async put<T, R = T>(
    path: string,
    body?: T,
    headers?: Record<string, string>,
    statusCode?: number,
  ): Promise<R> {
    return this.createRequest<T, R>('put', path, { body, headers, statusCode });
  }

  /**
   * Выполняет GET-запрос.
   * @param path - Путь для запроса.
   * @param headers - Заголовки запроса (опционально).
   * @param statusCode - Ожидаемый статус-код ответа (опционально).
   * @returns Промис с результатом запроса типа R.
   */
  async get<R>(path: string, headers?: Record<string, string>, statusCode?: number): Promise<R> {
    return this.createRequest<never, R>('get', path, { headers, statusCode });
  }

  /**
   * Выполняет DELETE-запрос.
   * @param path - Путь для запроса.
   * @param headers - Заголовки запроса (опционально).
   * @param statusCode - Ожидаемый статус-код ответа (опционально).
   * @returns Промис с результатом запроса типа R.
   */
  async delete<R>(path: string, headers?: Record<string, string>, statusCode?: number): Promise<R> {
    return this.createRequest<never, R>('delete', path, { headers, statusCode });
  }
}
