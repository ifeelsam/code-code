# a basic algorithm solving platform

```
git clone git@codeberg.org:xsam/code-X.git
cd code-X
bun install
bun run dev
```

if you have docker, create the image

```
docker build -t lets-code .
```

and run the container

```
docker run -v .:/usr/home/app -p 3000:3000 -d lets-code
```

and env format for firebase auth is at `app/web`

```
NEXT_PUBLIC_API_KEY=
NEXT_PUBLIC_AUTH_DOMAIN=
NEXT_PUBLIC_PROJECT_ID=
NEXT_PUBLIC_STORAGE_BUCKET=
NEXT_PUBLIC_MESSAGING_SENDER_ID=
NEXT_PUBLIC_APP_ID=
NEXT_PUBLIC_MEASUREMENT_ID=
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=password_nextauth
```
