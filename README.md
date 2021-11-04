# free-port
Get the next free port on your local network. 🌐 

### Usage
```js
// Assuming ports 3000, 3001, and 3002 are contested...
import { freePort } from "free-port";

(async () => {
  const port = await freePort(3000, { max: 3100 });
  console.log(port); // "3003"
})();
```
