import { AppContainer } from '../utils/container.utils';
import AuthModel from '../models/auth.model';
import { Response, route } from '../utils/api.utils';
import { AppError } from '../utils/errors.utils';

export const login = route(async (event) => {
  const authM = AppContainer.resolve(AuthModel);
  const { username, password } = event.appBody || {};
  const authResult = await authM.authenticate(username, password);

  if (authResult.authorized === true) {
    return Response({
      data: {
        accessToken: await authM.issueSession(authResult.sub, authResult.name, authResult.code),
      },
      statusCode: 200,
    });
  } else {
    throw new AppError(401, authResult.reason);
  }
});
