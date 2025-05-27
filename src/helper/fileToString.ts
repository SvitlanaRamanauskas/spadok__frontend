export const fileToDataString = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onerror = (error) => reject(error);
    reader.onload = () => resolve(reader.result as string);
  });
};


export const getUrlsFromFiles = async (
  files: File[],
  setter: React.Dispatch<React.SetStateAction<string[]>>,
  setError: (value: string) => void
) => {
  console.log("files", files)
  try {
    const previews = await Promise.all(
      files.map((file) => fileToDataString(file))
    );
    setter((prevPreviews: string[]) => [...prevPreviews, ...previews]);
  } catch (error) {
    setError("Could not load an image, please try again");
  }
};
