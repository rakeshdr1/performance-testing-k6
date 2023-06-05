import http from "k6/http";
import { sleep } from "k6";

const accessToken = "";

// Smoke Testing
// export const options = {
//   vus: 1,
//   duration: "10s",
// };

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
//     { duration: "10s", target: 100 },
//     { duration: "1m", target: 100 },
//     { duration: "10s", target: 3000 },
//     { duration: "3m", target: 3000 },
//     { duration: "10s", target: 100 },
//     { duration: "3m", target: 100 },
//     { duration: "10s", target: 0 },
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
  // Query dashboard API for month change stats
  const dashBoardQuery = `
    {
      getPartnerMonthChangeStats {
        userTotal {
          currentMonth
          lastMonth
        }
      }
    }
  `;

  // Find partner offer ads
  const offerAdsQuery = `
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
  `;

  // Find Surveys
  const surveysQuery = `
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
  `;

  //Find Five a day survey list
  const fiveADayQuery = `
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
  `;

  const surveyStatQuery = `
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
  `;

  // Data purchase list query
  const dataPurchaseQuery = `
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
  `;

  // Target audience list query
  const targetAudienceQuery = `
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
  `;

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const res = http.post(
    "https://api-dev.goodhuman.xyz/graphql",
    JSON.stringify({ query: dashBoardQuery }),
    {
      headers: headers,
    }
  );

  if (res.status == 200) {
    console.log(JSON.stringify(res.body));
    const body = JSON.parse(res.body);
    console.log(body);
  }

  sleep(0.3);
}
