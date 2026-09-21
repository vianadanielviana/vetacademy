# 📱 Guia Completo de Publicação: Apple App Store (iOS) & Google Play Store (Android)

Este projeto foi preparado com **Capacitor 8**, o padrão moderno que converte aplicações web modernas (Vite + React) em aplicativos nativos reais para iOS e Android.

---

## 🚀 1. Estrutura e Comandos Rápidos

O projeto conta com scripts dedicados no `package.json`:

```bash
# 1. Gerar o build de produção da aplicação
npm run build

# 2. Adicionar as plataformas nativas (executar apenas na primeira vez)
npm run cap:add:android
npm run cap:add:ios

# 3. Sincronizar qualquer alteração do código web para as pastas nativas
npm run cap:build

# 4. Abrir o projeto no Android Studio ou Xcode
npm run cap:android   # Abre no Android Studio
npm run cap:ios       # Abre no Xcode (requer macOS)
```

---

## 🤖 2. Publicação na Google Play Store (Android)

### Pré-requisitos
1. **Conta de Desenvolvedor Google Play Console**: Taxa única de US$ 25 no [Google Play Console](https://play.google.com/console).
2. **Android Studio** instalado no computador.

### Passo a Passo de Geração do Pacote (.aab)

1. **Sincronizar os arquivos:**
   ```bash
   npm run cap:build
   ```

2. **Abrir no Android Studio:**
   ```bash
   npm run cap:android
   ```

3. **Configurar Ícone e Splash:**
   - No Android Studio, clique com botão direito em `app/res` > `New` > `Image Asset`.
   - Selecione o ícone de alta resolução (em `public/icon-512.png`).

4. **Definir Versão (`android/app/build.gradle`):**
   ```groovy
   defaultConfig {
       applicationId "com.vetacademy.app"
       minSdkVersion 22
       targetSdkVersion 34 // Requisito Play Store
       versionCode 1
       versionName "1.0.0"
   }
   ```

5. **Gerar o arquivo assinado (Android App Bundle - AAB):**
   - No menu superior do Android Studio: `Build` > `Generate Signed Bundle / APK...`
   - Escolha **Android App Bundle** (`.aab`).
   - Crie ou selecione sua chave criptográfica (`.keystore` ou `.jks`). **Guarde essa chave em local seguro com backup.**
   - Selecione `release` e clique em **Create**.
   - O arquivo final será gerado em `android/app/release/app-release.aab`.

6. **Envio no Google Play Console:**
   - Crie um novo aplicativo no console com o nome **VetAcademy**.
   - Categoria: **Medicina / Saúde**.
   - Envie o arquivo `.aab` na trilha de produção ou teste fechado.
   - Preencha a classificação de conteúdo (IARC), política de privacidade e informações de contato.

---

## 🍎 3. Publicação na Apple App Store (iOS)

### Pré-requisitos
1. **Apple Developer Program**: Assinatura anual de US$ 99 em [developer.apple.com](https://developer.apple.com).
2. **Computador Mac com macOS** e o **Xcode** instalado pela Mac App Store.

### Passo a Passo no Xcode

1. **Sincronizar:**
   ```bash
   npm run cap:build
   ```

2. **Abrir no Xcode:**
   ```bash
   npm run cap:ios
   ```

3. **Configurar Assinatura & Time (Signing & Capabilities):**
   - Selecione o projeto `App` na árvore à esquerda.
   - Na aba **Signing & Capabilities**:
     - Marque **Automatically manage signing**.
     - Selecione seu **Team** de desenvolvedor da Apple.
     - Confirme o Bundle Identifier: `com.vetacademy.app`.

4. **Ícones do App (`AppIcon`):**
   - Em `App/Assets.xcassets/AppIcon`, certifique-se de preencher o ícone quadrado de **1024x1024 pixels**, formato PNG, sem transparência/canal alfa (exigência da Apple).

5. **Gerar o Pacote e Enviar para a Apple:**
   - No topo do Xcode, selecione o destino **Any iOS Device (arm64)**.
   - No menu: `Product` > `Archive`.
   - Após a compilação, a janela de **Organizer** se abrirá.
   - Clique em **Distribute App** > **App Store Connect** > **Upload**.

6. **Configuração no App Store Connect:**
   - Acesse [appstoreconnect.apple.com](https://appstoreconnect.apple.com).
   - Crie o app com o Bundle ID `com.vetacademy.app`.
   - Preencha:
     - Capturas de tela (Screenshots para iPhone de 6.7" e 6.5").
     - Descrição, palavras-chave e URL de Política de Privacidade.
     - Selecione o build enviado pelo Xcode (pelo TestFlight).
     - Submeta para a Revisão da Apple (**Submit for Review**).

---

## ⚖️ 4. Cuidados Específicos para Aprovação Médica/Veterinária

Tanto a Apple (Diretriz 1.4.1 de Aplicativos Médicos) quanto o Google exigem:
- ✅ **Aviso Médico Legal visível:** Já incluído nativamente no botão de alerta do cabeçalho e modal informativo, esclarecendo que o app é destinado a médicos veterinários e não substitui avaliação clínica presencial.
- ✅ **Modo Offline:** O app funciona perfeitamente sem internet (as calculadoras e metrônomo de RCP operam 100% localmente), evitando rejeição por "aplicativo que apenas exibe página web".
- ✅ **Haptics e Safe Areas:** Telas adaptadas com `safe-area-inset-top` e `safe-area-inset-bottom` para entalhes (Notch) e Dynamic Island do iPhone e barras de navegação do Android.
