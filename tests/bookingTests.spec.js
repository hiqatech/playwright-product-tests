const { test, expect } = require("@playwright/test");
const postBody = require("../requests/post_body.json");
const tokenBody = require("../requests/token_body.json");
const { json } = require("stream/consumers");

test.use({
  baseURL: process.env.API_BASE_URI.toString()
})

test("End to End API testing using playwright", async ({ request }) => {

  const tokenNo = null;

  const postAPIResponse = await test.step('Create booking', async () => {
    return await request.post("/booking", {
      data: postBody,
    });
  });

  const bookingId = await postAPIResponse.json();
  const bId = bookingId.bookingid;

  let getAPIResponse = await test.step('Get booking details', async () => {
    return await request.get("/booking/", {
      params: {
        firstname: "testers talk playwright",
        lastname: "testers talk api testing",
      },
    });
  });

  await test.step('Validate status code', async () => {
    console.log(await getAPIResponse.json());
    expect(getAPIResponse.ok()).toBeTruthy();
    expect(getAPIResponse.status()).toBe(200);
  });

  const tokenAPIResponse = await test.step('Generate token & Validate status code', async () => {
    return await request.post("/auth", {
      data: tokenBody,
    });
    expect(tokenAPIResponse.ok()).toBeTruthy();
    expect(tokenAPIResponse.status()).toBe(200);

    console.log(await tokenAPIResponse.json());
    const tokenResponseBody = await tokenAPIResponse.json();
    tokenNo = tokenResponseBody.token;
  });

  const patchAPIResponse = await test.step('Partial update booking details & Validate status code', async () => {
    return await request.patch(`/booking/${bId}`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${tokenNo}`,
      },
      data: {
        firstname: "testers talk postman",
        lastname: "testers talk rest assured",
      },
    });

    console.log(await patchAPIResponse.json());
    expect(patchAPIResponse.ok()).toBeTruthy();
    expect(patchAPIResponse.status()).toBe(200);
  });

  const deleteAPIResponse = await test.step('Delete booking & Validate status code', async () => {
    return await request.delete(`/booking/${bId}`, {
      headers: {
        "Content-Type": "application/json",
        "Cookie": `token=${tokenNo}`,
      },
    });
    expect(deleteAPIResponse.status()).toBe(201);
    expect(deleteAPIResponse.statusText()).toBe("Created");
  });
});