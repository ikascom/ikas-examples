export function getBase64Size(base64: string) {
  const base64Data = Buffer.from(base64, "base64");
  return base64Data.length / 1e6;
}

function getBase64(file: File): Promise<string | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    const handler = () => {
      resolve(reader.result as string);
      reader.removeEventListener("load", handler);
    };
    reader.addEventListener("load", handler);
    reader.readAsDataURL(file);
  });
}

export default getBase64;
