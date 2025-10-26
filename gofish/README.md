# GoFish

This folder contains a collection of phishing login templates curated to demonstrate the dangers of blindly trusting unfamiliar login pages.

## Purpose

The primary goal of these templates is to educate users about phishing attacks and how to recognize and avoid them. Each template mimics a common login page to show how easily one can be deceived.

## How It Works

Every template includes its own `phew.html` symlink that points to the canonical informational page. When a form is submitted, the browser follows that symlink and lands on [the shared `phew.html` page](https://crlf.wtf/gofish/phew.html), which explains phishing warning signs and how to stay protected.

JavaScript in each template intercepts submissions, prevents credential leakage, and performs the redirect client-side. If JavaScript is disabled, the form target still sends the browser to the local `phew.html` symlink so users see the educational content either way.

To support analytics, each template keeps its own `phew.html` symlink (for example, `ln -sf ../../phew.html phew.html`) so that hits can be attributed by path.

## Template Requirements

- `phew.html` symlink: Each template directory must contain a symbolic link named `phew.html` that resolves to the canonical informational page so visits can be tracked per template.
  - `ln -sf ../../phew.html phew.html`
- Form attributes: Form fields must omit `name` attributes to guarantee that no credentials are posted back to any server.
  ```html
  <!-- Example form fields without name attributes -->
  <input type="text" placeholder="Username">
  <input type="password" placeholder="Password">
  ```
- Form target and method: Point the form's `action` at the local `phew.html` symlink and do not set a `method`. This ensures non-JavaScript fallbacks behave as expected without sending data to a backend.
  ```html
  <form id="login-form" action="phew.html">
    <!-- form fields here -->
  </form>
  ``` 
- JavaScript handler: Give the form the id `login-form` and include the following script so submissions are blocked client-side and the user is redirected to the informational page.
  ```html
  <script>
    document.getElementById('login-form').addEventListener('submit', function (event) {
      event.preventDefault();

      // Redirect to an informational page
      window.location.href = '/gofish/phew.html';
    });
  </script>
  ```

## Usage

1. Clone the repository.
2. Navigate to the `gofish/<year>` folder.
3. Ensure the template contains the required `phew.html` symlink and JavaScript handler.
4. Open any of the phishing templates in a web browser.
5. Observe the behavior and redirection to the informational page.

## Disclaimer

These templates are actively used for educational purposes only in a classroom setting. They are not intended to be used for malicious activities. Misuse of these templates can lead to legal consequences.

## Learn More

In addition to the included informational page, here are some additional pages and resources to learn more about phishing:

- [Phishing Wikipedia](https://en.wikipedia.org/wiki/Phishing)
- [StaySafeOnline Phishing Guide](https://staysafeonline.org/theft-fraud-cybercrime/phishing/)
- [Cybersecurity & Infrastructure Security Agency Phishing Guide](https://www.cisa.gov/secure-our-world/recognize-and-report-phishing)