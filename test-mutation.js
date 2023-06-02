import http from "k6/http";
import { sleep } from "k6";

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjYzYWI4N2NiYTkzOGE5NWJkYjQxYiIsImlhdCI6MTY4NTcxNTQ5NiwiZXhwIjoxNjg1NzE2Mzk2fQ.fOWWm-UlVMYv-2j62BT_yUZfpXOWRY_0MX0NtSFAelA";
const adminAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0M2U3YjcxMWQ3NGFlMjljYWRhMTQ3NCIsImlhdCI6MTY4NTcwODg5MywiZXhwIjoxNjg1NzA5NzkzfQ.ZioLNEQL8Ka1iutk8pJAkLksEcdiei-eyMDLt4zDVIA";

// Load Testing
// export const options = {
//   stages: [
//     { duration: "5m", target: 100 },
//     { duration: "10m", target: 100 },
//     { duration: "5m", target: 0 },
//   ],
//   thresholds: {
//     http_req_duration: ["p(99)<1500"],
//   },
// };

// Stress testing
// export const options = {
//   stages: [
//     { duration: "2m", target: 100 },
//     { duration: "5m", target: 100 },
//     { duration: "2m", target: 300 },
//     { duration: "5m", target: 300 },
//     { duration: "2m", target: 500 },
//     { duration: "5m", target: 500 },
//     { duration: "2m", target: 700 },
//     { duration: "5m", target: 700 },
//     { duration: "10m", target: 0 },
//   ],
// };

// Spike Testing
// export const options = {
//   stages: [
//     { duration: '10s', target: 100 },
//     { duration: '1m', target: 100 },
//     { duration: '10s', target: 3000 },
//     { duration: '3m', target: 3000 },
//     { duration: '10s', target: 100 },
//     { duration: '3m', target: 100 },
//     { duration: '10s', target: 0 },
//   ],
// };

// Soak Testing
// export const options = {
//   stages: [
//     { duration: '2m', target: 400 },
//     { duration: '3h56m', target: 400 },
//     { duration: '2m', target: 0 },
//   ],
// };

// export const options = {
//   vus: 10,
//   duration: "30s",
// };

// export const options = {
//   stages: [
//     { duration: '30s', target: 20 },
//     { duration: '1m30s', target: 10 },
//     { duration: '20s', target: 0 },
//   ],
// };

export default function () {
  // Batch Request
  const batchRequest = [
    {
      query: `
        mutation {
          initiateRechargePartner(input: { amount: 57.65657 }) {
            redirectUrl
            paymentId
          }
        }
      `,
      accessToken: accessToken,
      name: "Recharge Partner Wallet",
    },
    {
      query: `
        mutation {
          initiateRechargeAdmin(input: { amount: 57.65657 }) {
            redirectUrl
            paymentId
          }
        }
      `,
      accessToken: accessToken,
      name: "Recharge Admin Wallet",
    },
    {
      query: `
        mutation {
          sendOtpForTransferAdminRequest(input: { partnerId: "64263ab87cba938a95bdb41b", amount: 3 }) {
            message
            success
          }
        }
      `,
      accessToken: adminAccessToken,
      name: "Admin Transfer",
    },
  ];

  const headers = {
    Authorization: `Bearer ${adminAccessToken}`,
    "Content-Type": "application/json",
  };

  const requests = batchRequest.map((request) => ({
    method: "POST",
    url: "https://api-dev.goodhuman.xyz/graphql",
    body: JSON.stringify({ query: request.query }),
    headers: Object.assign({}, headers, {
      Authorization: `Bearer ${request.accessToken}`,
    }),
    tags: { name: request.name },
  }));

  const res = http.batch(requests);

  res.forEach((response, index) => {
    console.log(`Response for ${batchRequest[index].name}: ${response.status}`);
    console.log(response.body);
  });

  sleep(0.3);
}
