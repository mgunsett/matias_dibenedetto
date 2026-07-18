import { extendTheme } from '@chakra-ui/react'

// ══════════════════════════════════════════════════════════════════
// Paletas de marca — Universitario de Deportes
// Basadas en el escudo (granate #9E1B1E sobre crema) y las camisetas:
// titular crema con acentos granate / alterna granate con bastones.
//
// Los nombres de los tokens se conservan (amber, dark, bone, etc.)
// para que todos los componentes funcionen sin cambios: lo que antes
// era "dorado" ahora es el granate de la U, y "bone/boneWarm" pasan
// a ser el texto principal y el crema del escudo.
// ══════════════════════════════════════════════════════════════════

// ─── PALETA OSCURA — negro cálido + arena + vino apagado ───────────
// Tonalidades editoriales: arena/crema como acento principal, vino
// desaturado para números y destacados, y el marrón rosado de la
// camiseta alternativa como detalle en hovers.
const brandDark = {
  brown:      '#171514', // base casi negra cálida neutra
  brownDark:  '#000000', // negro profundo
  brownLight: '#3B322E', // sombra marrón cálida
  amber:      '#dbccaf', // arena/dorado apagado (bordes/títulos)
  amber2:     '#c2ac828e',
  amberDark:  '#8F7B54', // arena oscura
  amberLight: '#c2ac824f', // arena translúcida (bordes suaves)
  dorado:     '#A04E56', // vino luminoso (acentos destacados)
  orange:     '#B08573', // marrón rosado camiseta alterna (hover botones)
  orangeDark: '#8A6353', // marrón rosado oscuro
  orangeLight:'#cca56b', // marrón rosado claro
  dark:       '#2321209f', // fondo casi negro cálido (mantener alpha)
  dark3:      '#232120a1',
  dark2:      '#a5a09a', // divisores neutros cálidos
  gray:       '#AFA08D', // arena apagada (texto secundario)
  gray2:      '#8B4149', // vino apagado (números grandes/relleno)
  bone:       '#FFFFFF', // texto principal
  boneWarm:   '#E3D4B1', // crema arena (detalles)
  rec:        '#E5484D', // rojo del indicador REC
  bgRef:      '#b0857321', // bg de hover en cajas (guiño camiseta alterna)
}

// ─── PALETA CLARA — inspirada en la camiseta titular crema ─────────
const brandLight = {
  brown:      '#FCF8EC', // superficie clara (tarjetas/nodos)
  brownDark:  '#EFE6CF', // crema profundo (sombras suaves)
  brownLight: '#7A3A3C', // granate amarronado (texto de apoyo)
  amber:      '#9E1B1E', // granate del escudo (bordes/títulos)
  amber2:     '#9e1b1e8e',
  amberDark:  '#701316', // granate oscuro
  amberLight: '#9e1b1e40', // granate translúcido (bordes suaves)
  dorado:     '#B22A2E', // rojo U (acentos destacados)
  orange:     '#8F191C', // hover de botones
  orangeDark: '#6E1214', // hover de botones (oscuro)
  orangeLight:'#C24448', // hover de botones (claro)
  dark:       '#F5EFDE', // fondo crema (camiseta titular)
  dark3:      '#EFE8D2',
  dark2:      '#CDBFA5', // divisores sobre crema
  gray:       '#7D6E5F', // texto secundario cálido
  gray2:      '#8F393C', // granate apagado (números grandes/relleno)
  bone:       '#241718', // texto principal (casi negro granate)
  boneWarm:   '#8A1E22', // granate (detalles/labels)
  rec:        '#C1121F', // rojo del indicador REC
  bgRef:      '#9e1b1e12', // bg de hover en cajas
}

// Elegí la paleta de la landing:
//  'dark'  → fondo oscuro granate, acentos rojo U + crema
//  'light' → fondo crema titular, acentos granate del escudo
const PALETTE = 'dark'

const brand = PALETTE === 'light' ? brandLight : brandDark

// Colores de la firma del desarrollador (crédito en el footer)
const dev = {
  green: '#2D5A47',
  cream: '#E8D5A3',
}

const theme = extendTheme({
  colors: { brand, dev },
  fonts: {
    heading:   `'Bebas Neue', sans-serif`,
    body:      `'Barlow', sans-serif`,
    mono:      `'Barlow Condensed', sans-serif`,
  },
  styles: {
    global: {
      'html, body': {
        bg: brand.dark,
        color: brand.bone,
        overflowX: 'hidden',
      },
      '::-webkit-scrollbar': { width: '4px' },
      '::-webkit-scrollbar-track': { bg: brand.dark },
      '::-webkit-scrollbar-thumb': { bg: brand.amber, borderRadius: '2px' },
    },
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
})

export default theme
