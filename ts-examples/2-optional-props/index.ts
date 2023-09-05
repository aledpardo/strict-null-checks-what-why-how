import { ApiResponseModel } from '../1-optional-props/interface';

export function computeRootPlayersTotalScore(apiResponse: ApiResponseModel): number {
  const defaultScore = 0;

  const validData = apiResponse.data.filter(({type}) => type !== "CHEATER");

  return validData.reduce((sum, {score}) => sum + score, defaultScore);
}

computeRootPlayersTotalScore({  });
