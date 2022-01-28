# Working behind a corporate

## Environment

Most tools (including npm and git) use the `HTTP_` and `HTTPS_` environment variables to work with a
corporate .

### Windows

In Windows environments, add the `HTTP_` and `HTTPS_` system environment variable, with these values:

- HTTP_: `http://<username>:<password>@<_server>:<_port>`
- HTTPS_: `%HTTP_%`

### Unix

Add these lines to your `~/.bash_profile` or `~/.profile`:

```sh
export HTTP_="http://<username>:<password>@<_server>:<_port>"
export HTTPS_="$HTTP_"
```

##  with SSL custom certificate

Some  like **zscaler** use a custom SSL certificate to inspect request, which may cause npm commands to fail.

To solve this problem, you can disable the `strict-ssl` option in npm.

##  exceptions

If you need to access repositories on your local network that should bypass , set the `NO_` environment
variable, in the same way as `HTTP_`:

### Windows

- NO_: `127.0.0.1, localhost, <your_local_server_ip_or_hostname>`

### Unix

```sh
export NO_="127.0.0.1, localhost, <your_local_server_ip_or_hostname>"
```

### Npm

Run this command in your project directory:

```sh
npm set strict-ssl false
```
