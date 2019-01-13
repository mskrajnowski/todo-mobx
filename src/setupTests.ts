import "reflect-metadata"
import { container } from "./di"

// make sure DI is reset before each test, so mocks don't leak
beforeEach(() => container.snapshot())
afterEach(() => container.restore())
