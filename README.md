# Bills

Aplicacion de gastos construida con React + Vite y preparada para ejecutarse como app movil con Capacitor.

## Desarrollo web

```bash
npm install
npm run dev
```

## Flujo movil con Capacitor

La app web se compila en `dist` y Capacitor copia ese contenido dentro de los proyectos nativos configurados.

```bash
npm run cap:build
```

Ese comando:

- compila la app con Vite
- sincroniza los assets web con las plataformas nativas instaladas

Para abrir el proyecto nativo en Android Studio:

```bash
npm run cap:android
```

## Comandos utiles

```bash
npm run build
npm run lint
npm run cap:copy
npm run cap:sync
npm run cap:add:ios
npm run cap:sync:ios
npm run cap:ios
npm run apk:debug
```

## Generar APK

Para generar un APK de prueba desde la raiz del proyecto:

```bash
npm run apk:debug
```

El archivo resultante queda en:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

## Nota sobre iOS

La configuracion para iOS ya esta declarada en el proyecto mediante `@capacitor/ios`.

Para generar la app nativa de iOS necesitas ejecutar estos pasos desde macOS con Xcode instalado:

```bash
npm install
npm run cap:add:ios
npm run cap:build
npm run cap:ios
```

Notas:

- `npm run cap:add:ios` crea la carpeta nativa `ios/` la primera vez
- `npm run cap:build` recompila la web y sincroniza Capacitor
- `npm run cap:ios` abre el proyecto en Xcode para compilar o firmar la app
