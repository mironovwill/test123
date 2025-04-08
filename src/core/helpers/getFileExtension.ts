export function getFileExtension(filename: string) {
  const lastDotIndex = filename.lastIndexOf('.');
  if (lastDotIndex === -1 || lastDotIndex === filename.length - 1) {
    return '';
  }
  return filename.slice(lastDotIndex + 1);
}
