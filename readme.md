# Quill UI

**Overview**

Quill UI is a library component designed for Deriv Applications. It is tightly integrated with our Design System, and its styling is entirely based on Design Tokens.


**Features**

- *Design System Integration:* Quill UI seamlessly integrates with our Design System, ensuring a unified and cohesive user interface across Deriv Applications.
  
- *Styling with Design Tokens:* The styling of Quill UI components is determined by Design Tokens, guaranteeing a consistent and harmonious look and feel.


**Installation**

To incorporate Quill UI into your  applications, follow these steps:

1. Install the Quill UI package using npm:

    ```bash
    npm i @deriv-com/quill-ui
    ```

2. Install the Quill Tokens package using npm:

    ```bash
    npm i @deriv-com/quill-tokens
    ```

3. Integrate Quill UI components into your application as needed.


**Usage**

Quill UI components are designed to be easily incorporated into your application. Simply import the desired components and use them according to your requirements.

Example:

```javascript
import { Button } from '@deriv-com/quill-ui';

// ... Your code here
```
you can explore the Storybook to learn about the available props for each component.

Styles:

Quill UI components are styled with Quill Tokens, so ensure you import the corresponding styles.

```javascript
import "@deriv-com/quill-tokens/dist/quill.css";
```

**Development**

To get started, first install all of the relevant packages by doing:

```
npm i
```
Since this projects uses Storybook to showcase the components. You can serve them by simply running this command:
```
npm run storybook
```

**Contributing**

Contributions to the @deriv-com/quill-ui library are warmly encouraged. If you have suggestions for enhancements or encounter a bug, please feel free to open an issue or submit a pull request.

<a height="15" href = "https://github.com/deriv-com/quill-ui">
  <img src = "https://contrib.rocks/image?repo=deriv-com/quill-ui&anon=0&columns=20"/>
</a>