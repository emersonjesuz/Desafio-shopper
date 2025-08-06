export enum ReviewCommentEnum {
  "Não gostei!" = "Não gostei!",
  "Podia ser melhor!" = "Podia ser melhor!",
  "Gostei!" = "Gostei!",
  "Muito bom!" = "Muito bom!",
  "Excelente!" = "Excelente!",
}

export type ReviewCommentEnumKey = keyof typeof ReviewCommentEnum;
