const request = require("supertest");
const server = require("../index");

describe('GET /cafes', () => {
  it('deberia devolver un status 200 con un arreglo que teng aal menos 1 obejto', async () => {
    const r = await request(server).get("/cafes")
    expect(r.status).toBe(200)
    expect(r.body).toBeInstanceOf(Array)
    expect(r.body.length).toBeGreaterThan(0)
  })
})

describe('DELETE /cafes/:id', () => {
  it('deberia devolver un status 404 al intentar borrar un un cafe con un id que no existe', async () => {
    const r = await request(server).delete("/cafes/5").set('Authorization', 'token')
    expect(r.status).toBe(404)
  })
})

describe('POST /cafes', () => {
  it('deberia devolver un status 201 al crear un nuevo cafe', async () => {
    const originalLength = (await request(server).get("/cafes")).body.length
    const r = await request(server).post("/cafes").send({ id: 5, nombre: "Nuevo Cafe" })
    expect(r.body.length).toBe(originalLength + 1)
    expect(r.status).toBe(201)
  })
})

describe('PUT /cafes/:id', () => {
  it('deberia devolver un status 400 al intentar actualizar un cafe con un id distinto al id dentro del payload', async () => {
    const r = await request(server).put("/cafes/1").send({ id: 2, nombre: "Cafe Actualizado" })
    expect(r.status).toBe(400)
  })
})