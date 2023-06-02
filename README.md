
**k6** is a modern load-testing tool, built on [our years of experience](https://k6.io/about) in the performance and testing industries.
It's built to be powerful, extensible, and full-featured. The key design goal is to provide **the best developer experience**.

Its core features are:

- **Configurable load generation.** Even lower-end machines can simulate lots of traffic.
- **Tests as code.** Reuse scripts, modularize logic, version control, and integrate tests with your CI.
- **A full-featured API.** The scripting API is packed with features that help you simulate real application traffic.
- **An embedded JavaScript engine.** The performance of Go, the scripting familiarity of JavaScript.
- **Multiple Protocol support**. HTTP, WebSockets, gRPC, and more.
- **Large extension ecosystem.** You can extend k6 to support your needs. And many people have already shared their extensions with the community!
- **Flexible metrics storage and visualization**. Summary statistics or granular metrics, exported to the service of your choice.

This is what load testing looks like in the 21st century.

## Example script


```js
import http from "k6/http";
import { check, sleep } from "k6";

// Test configuration
export const options = {
  thresholds: {
    // Assert that 99% of requests finish within 3000ms.
    http_req_duration: ["p(99) < 3000"],
  },
  // Ramp the number of virtual users up and down
  stages: [
    { duration: "30s", target: 15 },
    { duration: "1m", target: 15 },
    { duration: "20s", target: 0 },
  ],
};

// Simulated user behavior
export default function () {
  let res = http.get("https://test-api.k6.io/public/crocodiles/1/");
  // Validate response status
  check(res, { "status was 200": (r) => r.status == 200 });
  sleep(1);
}
```

You can run scripts like this on the CLI, or in your CI, or across a Kubernetes cluster.

## Documentation

The docs cover all aspects of using k6. Some highlights include:
- [Get Started](https://k6.io/docs). Install, run a test, inspect results.
- [HTTP requests](https://k6.io/docs/using-k6/http-requests/). Have your virtual users use HTTP methods.
  Or, check the other [Protocols](https://k6.io/docs/using-k6/protocols/).
- [Thresholds](https://k6.io/docs/using-k6/thresholds). Set goals for your test, and codify your SLOs.
- [Options](https://k6.io/docs/using-k6/k6-options). Configure your load, duration, TLS certificates, and much, much more.
- [Scenarios](https://k6.io/docs/using-k6/scenarios).
  Choose how to model your workload: open models, closed models, constant RPS, fixed iterations, and more.
- [Results output](https://k6.io/docs/results-output). Study, filter, and export your test results.
- [JavaScript API](https://k6.io/docs/javascript-api). Reference and examples of all k6 modules.
- [Extensions](https://k6.io/docs/extensions). Extend k6 for new protocols and use cases.
