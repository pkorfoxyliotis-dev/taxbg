/** Pure, dependency-free — safe to import from both client and server code. */
export const GREEK_ALIAS_REGEX = /^[Α-Ωα-ωΆΈΉΊΌΎΏάέήίόύώϊϋΐΰ0-9_]{2,32}$/

export function isValidGreekAlias(alias: string): boolean {
  return GREEK_ALIAS_REGEX.test(alias)
}
