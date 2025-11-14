import NumberOnly from "../NumberOnly"

export const ValidatingNoIdn = (no_hp) => {
    let noOnly = NumberOnly(no_hp)
    if (noOnly.length <= 1) {
        return noOnly.trim()
    }
    noOnly = noOnly.charAt(0) === '0' ? '62' + noOnly.substring(1) : noOnly
    return "+" + noOnly.trim()
}