import http from "k6/http";
import { sleep } from "k6";

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjYzYWI4N2NiYTkzOGE5NWJkYjQxYiIsImlhdCI6MTY4NTcxNTQ5NiwiZXhwIjoxNjg1NzE2Mzk2fQ.fOWWm-UlVMYv-2j62BT_yUZfpXOWRY_0MX0NtSFAelA";
const adminAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjZjODNiM2ExNTE5YWNjNzYxMzM5ZCIsImlhdCI6MTY4NTcwMTA5NCwiZXhwIjoxNjg1NzAxOTk0fQ.sJs8ciZNzFOU0hqPl2iQpXK2VzgVgJqFGgtlo8Wjwig";

// // Smoke Testing
// export const options = {
//   vus: 1,
//   duration: "10s",
// };

// Load Testing
export const options = {
  stages: [
    { duration: "5m", target: 100 },
    { duration: "10m", target: 100 },
    { duration: "5m", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(99)<1500"],
  },
};

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
  const queries = [
    {
      name: "Dashboard Query",
      query: `
        {
          getPartnerMonthChangeStats {
            userTotal {
              currentMonth
              lastMonth
            }
            userTargeted {
              currentMonth
              lastMonth
            }
            userReached {
              currentMonth
              lastMonth
            }
            surveyTargeted {
              currentMonth
              lastMonth
            }
            surveyReached {
              currentMonth
              lastMonth
            }
            surveyTotalSpent {
              currentMonth
              lastMonth
            }
            offerTargeted {
              currentMonth
              lastMonth
            }
            offerReached {
              currentMonth
              lastMonth
            }
            offerTotalSpent {
              currentMonth
              lastMonth
            }
            appEngagement {
              currentMonth
              lastMonth
            }
            appActivity {
              currentMonth
              lastMonth
            }
            platFormActivity {
              currentMonth
              lastMonth
            }
          }
        }
      `,
    },
    {
      name: "Find Partner Offer Ads",
      query: `
        {
          findPartnerOfferAds(input:{status:3}) {
            offerAds {
              createdAt
              updatedAt
              deletedAt
              id
              partner
              title
              type
              validFrom
              validTo
              status
              offerCode
              websiteLink
              shortDescription
              description
              expectedViewsCount
              rewardPerUser
              totalTokenRequired
              comment
              subtitle
              paymentStatus
              media{
                url
                type
                usageType
              }
            }
            total
            page
            limit
            stats{
              total
              activeTotal
              inactiveTotal
              rejectedTotal
              pendingTotal
            }
          }
        }
      `,
    },
    {
      name: "Find Surveys",
      query: `
        {
          findPartnerSurveys(input: {}) {
            surveys {
              createdAt
              updatedAt
              deletedAt
              id
              name
              partner
              audienceSize
              publishDate
              endDate
              expectedAnswersCount
              rewardsPerUser
              totalTokensRequired
              status
              comment
              paymentStatus
              questionGroup
              featured
            }
            total
            page
            limit
          }
        }
      `,
    },
    {
      name: "Find Five a day survey list",
      query: `
        {
          findAllQuestionGroup(input: {}) {
            questionGroups {
              createdAt
              updatedAt
              deletedAt
              id
              name
              status
              groupType
              questions {
                text
              }
              responseCount
            }
            total
            page
          }
        }
      `,
      accessToken: adminAccessToken, // Use admin access token for this query
    },
    {
      name: "Survey Statistics",
      query: `
        {
          findOneSurveyStats(input: { id: "643e3e3460d67eb72ec539b0" }) {
            questionsStats {
              id
              text
              type
              responseStats {
                option
                count
              }
            }
            totalResponseCount
            textQuestionsStats {
              id
              text
              type
              response
            }
          }
        }
      `,
    },
    {
      name: "Data Purchase List",
      query: `
        {
          findAllDataPurchase(input: {}) {
            total
            totalPages
            page
            limit
            dataPurchases {
              createdAt
              updatedAt
              deletedAt
              id
              name
              dataFrom
              dataTo
              numOfUsers
              status
              stage
              owner
              ownerEmail
              users
              userCount
              versionKey
              relationType
              fileUrl
              isPaymentDone
              dataPurchaseKey
              partnerName
            }
          }
        }
      `,
    },
    {
      name: "Target Audience List",
      query: `
        {
          findPartnerTargetAudience(input: { page: 1 }) {
            targetAudiences {
              createdAt
              updatedAt
              deletedAt
              id
              name
              shortNote
              status
              owner
              userCount
              versionKey
            }
            total
            page
            limit
          }
        }
      `,
    },
  ];

  const headers = {
    "Content-Type": "application/json",
  };

  queries.forEach((query) => {
    const headersWithToken = query.accessToken
      ? Object.assign({}, headers, {
          Authorization: `Bearer ${query.accessToken}`,
        })
      : Object.assign({}, headers, {
          Authorization: `Bearer ${accessToken}`,
        });

    const res = http.post(
      "https://api-dev.goodhuman.xyz/graphql",
      JSON.stringify({ query: query.query }),
      {
        headers: headersWithToken,
        tags: { name: query.name },
      }
    );

    console.log(`Response for ${query.name}: ${res.status}`);
    console.log(res.body);

    sleep(0.3);
  });
}
