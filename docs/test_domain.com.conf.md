  
# Different nginx configuration files

Location of the files: /etc/nginx/sites-available/test_domain.com 

Essential *after* configuring nginx service block
```bash
$ sudo ln -s /etc/nginx/sites-available/test_domain.com /etc/nginx/sites-enabled/
```

## Uitvoeren test
```bash
$ curl -v -X POST -H "Content-Type: application/json"  -d '{"identifier":"testauthor", "password": "testauthor"}' http://www.test_domain.com/api/auth/local
```
## Working config
```
server {
    listen 80;
    listen [::]:80;
                
    root /var/www/test_domain.com/html;
    index index.html index.htm index.nginx.debian.html;

    server_name www.test_domain.com test_domain.com;

    gzip on;
    log_not_found on;
    log_subrequest on;
    
    access_log /var/log/nginx/access_test_domain.com.log;
    error_log /var/log/nginx/error_test_domain.com.log;
               
    location /api {
       rewrite ^/api/(.*) /$1 break;
       proxy_pass http://localhost:1337;
    }                
    
    location / {
        try_files $uri $uri/ =404;
    } 
    
}    
```

## Test 1
```
server {
    listen 80;
    gzip on;
            
    root /var/www/test_domain.com/html;
    index index.html index.htm index.nginx.debian.html;
    
    server_name test_domain.com www.test_domain.com;
            
            
    location / {
        try_files $uri $uri/ =404;
    }
}            
```

Not working no proxy_pass

## Test 2  
```
server {
    listen 80;
    gzip on;
            
    root /var/www/test_domain.com/html;
    index index.html index.htm index.nginx.debian.html;
    
    server_name test_domain.com www.test_domain.com;
            
            
    location / {
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
            #
            # Custom headers and headers various browsers *should* be OK with but aren't
            #
            add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
            #
            # Tell client that this pre-flight info is valid for 20 days
            #
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain; charset=utf-8';
            add_header 'Content-Length' 0;
            return 204;
        }
        if ($request_method = 'POST') {
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
            add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
        }
        if ($request_method = 'GET') {
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
            add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
        }
        try_files $uri $uri/ =404;
    }
}            
```

Not working no proxy_pass

## Test 3
see https://serverfault.com/questions/1041431/angular-cors-with-nginx 

```
map $request_method $route {
    GET        main;
    POST       main;
    DELETE     main;
    PUT        main;
    OPTIONS    options;
    default    invalid;
}

map $request_method $api {
    GET        api;
    POST       api;
    DELETE     api;
    PUT        api;
    OPTIONS    options;
    default    invalid;
}

server {
    listen 80;
    gzip on;
            
    root /var/www/test_domain.com/html;
    index index.html index.htm index.nginx.debian.html;
    
    server_name test_domain.com www.test_domain.com;
            
            
    location / {
        try_files /dev/null @$route;
    }

    location /api {
        try_files /dev/null @$api;
    }

    location @main {
        # websocket conntection setup
        proxy_set_header HOST $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_pass_request_headers on;
        proxy_http_version 1.0;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_read_timeout 120s;
        # pass the request
        proxy_pass http://localhost:4200;
        # add response CORS headers
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
        add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
    }

    location @api {
        # transform the URI        
        rewrite ^/api(.*) /backend$1 break;
        # pass the request
        proxy_pass http://localhost:8080;
        # add response CORS headers
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
        add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
    }

    location @options {
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
        add_header 'Access-Control-Max-Age' 1728000;
        add_header 'Content-Type' 'text/plain; charset=utf-8';
        add_header 'Content-Length' 0;
        return 204;
    }

    location @invalid {
        # method not allowed
        add_header Allow "GET, POST, OPTIONS";
        return 405;
    }
}            
```

Not needed, see working config

## Test 4
see https://serverfault.com/questions/1041431/angular-cors-with-nginx 

and https://stackoverflow.com/questions/8305015/when-using-proxy-pass-can-etc-hosts-be-used-to-resolve-domain-names-instead-of 

```

map $wanted_host $wanted_host_ip
{
    default 127.0.0.1;
    www.test_domain.com 127.0.0.1;    
    test_domain.com 127.0.0.1;
}

map $request_method $route {
    GET        main;
    POST       main;
    DELETE     main;
    PUT        main;
    OPTIONS    options;
    default    invalid;
}

map $request_method $api {
    GET        api;
    POST       api;
    DELETE     api;
    PUT        api;
    OPTIONS    options;
    default    invalid;
}

server {
    listen 80;
    gzip on;
            
    root /var/www/test_domain.com/html;
    index index.html index.htm index.nginx.debian.html;
    
    server_name   ~^(?P<wanted_port>[0-9]+?)-(?P<wanted_host>.+?)\.HOSTNAME$;
                        
    location / {
        try_files /dev/null @$route;
    }

    location /api {
        try_files /dev/null @$api;
    }

    location @main {
        # websocket conntection setup
        proxy_set_header HOST $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_pass_request_headers on;
        proxy_http_version 1.0;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_read_timeout 120s;
        # pass the request
        proxy_pass http://localhost:4200;
        # add response CORS headers
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
        add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
    }

    location @api {
        # transform the URI        
        rewrite ^/api(.*) /backend$1 break;
        # pass the request
        proxy_pass http://localhost:1337;
        # add response CORS headers
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
        add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
    }

    location @options {
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
        add_header 'Access-Control-Max-Age' 1728000;
        add_header 'Content-Type' 'text/plain; charset=utf-8';
        add_header 'Content-Length' 0;
        return 204;
    }

    location @invalid {
        # method not allowed
        add_header Allow "GET, POST, OPTIONS";
        return 405;
    }
}            
```

Not needed, see working config