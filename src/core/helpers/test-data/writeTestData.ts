import path from 'path';
import fs from 'fs/promises';

export async function writeTestData(data: object, filePath: string): Promise<void> {
  const fullPath = path.join(process.cwd(), filePath);
  await fs.writeFile(fullPath, JSON.stringify(data, null, 2));
  console.log(`🎉🚀 Ура! Тестовые данные успешно сохранены!`);
}
