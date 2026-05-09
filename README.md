# Bills

Aplicacion de gastos construida con React + Vite y preparada para ejecutarse como app movil con Capacitor.

## Desarrollo web

```bash
npm install
npm run dev
```

## Flujo movil con Capacitor

La app web se compila en `dist` y Capacitor copia ese contenido dentro del proyecto nativo de Android.

```bash
npm run cap:build
```

Ese comando:

- compila la app con Vite
- sincroniza los assets web con Android

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

Capacitor tambien soporta iOS, pero la plataforma nativa de iOS debe añadirse desde macOS con Xcode instalado.
