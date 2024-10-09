# BreadCrumbs

BreadCrumbs is an npm library designed to enhance user experience by efficiently managing query parameters and form fields through first-party cookies. This library simplifies data handling by automatically storing query parameters in cookies and allows for easy retrieval and manipulation of form data.

## Features

- **Automatic Cookie Storage**: Automatically stores a cookie with all query parameters from the URL, ensuring that important data is retained between page loads.
  
- **Form Field Auto-Fill**: Use the `formfill` function to automatically fill all form fields on the page with values stored in the cookie, making it easier for users to complete forms quickly.

- **Upsert Functionality**: The `upsert` function allows you to add or update values in the cookie easily, ensuring that your data remains accurate and up-to-date.

## Installation

To install the BreadCrumbs library, run:

```bash
npm install breadcrumbs
```

## Usage

### Automatic Cookie Storage

BreadCrumbs will automatically store query parameters as cookies when the library is initialized. Simply include the library in your project:

```javascript
import BreadCrumbs from 'breadcrumbs';
```

### Filling Form Fields

To fill form fields with stored values, call the `formfill` function:

```javascript
BreadCrumbs.formfill();
```

### Adding or Updating Values

Use the `upsert` function to add new values or update existing ones in the cookie:

```javascript
BreadCrumbs.upsert('key', 'value');
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue to discuss potential changes.

## Acknowledgments

Special thanks to the open-source community for their invaluable resources and inspiration!