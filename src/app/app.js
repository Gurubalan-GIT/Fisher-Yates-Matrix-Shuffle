import { MatrixService } from "../utils";

export const run = () => {
  const matrixService = new MatrixService(3);
  matrixService.renderMatrix()
}

