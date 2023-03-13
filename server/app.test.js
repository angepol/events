// const { connectDB, dropDB, dropCollections } = require("./setupTestDb");
const { EventSchema } = require("./model/EventSchema");
const supertest = require("supertest");
const index = require("./index.js");

// beforeAll(async () => {
//     await connectDB();
//     server = app.listen(8080);
//   });
  
//   afterEach(async () => {
//     await dropCollections();
//   });
  
//   afterAll(async () => {
//     await dropDB();
//     await server.close();
//   });



// Jest has detected the following 1 open handle potentially keeping Jest from exiting:
afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});


describe("index", () => {
    describe("GET /", () => {
      it("successfully calls root", async () => {
        const response = await request(index).get("/");
  
        expect(response.statusCode).toBe(200);
        expect(response.headers["content-type"]).toEqual(
          expect.stringContaining("json"),
        );
        expect(response.body).toEqual(
          expect.objectContaining({
            test: "hello!",
          }),
        );
      });
    });

  describe("POST /add-event ", () => {
    it("adds an event to the database", async () => {
        const eventDate = Date.now()
        await supertest(index)
        .post("/add-event")
        .send({
            eventName: "Triathalon",
            where: "San Diego",
            description: "San Dieogo's most famous Triathalon",
            date: eventDate,
        })
        .expect(201);

        const mostRecentEntry = await EventSchema.findOne({}).sort({
            $natural: -1,
        });

    expect(mostRecentEntry).toEqual(
        expect.objectContaining({
          _id: expect.anything(),
          eventName: "Triathalon",
          where: "San Diego",
          description: "San Dieogo's most famous Triathalon",
          date: eventDate,
        }),
      );
     })
   }); 
});