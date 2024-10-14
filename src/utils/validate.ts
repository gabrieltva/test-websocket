export function validWSURL(str: string): boolean {
  const pattern = new RegExp(
    '^(wss?:\\/\\/)?' + // protocolo
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domínio
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // ou endereço IP (v4)
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // porta e caminho
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i' // fragmento
  );
  return pattern.test(str);
}
