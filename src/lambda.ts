import { createApp } from './utils'

import serverlessExpress from '@vendia/serverless-express'
import { Callback, Context, Handler } from 'aws-lambda'

let server: Handler

async function bootstrap(): Promise<Handler> {
  const app = await createApp()
  await app.init()

  const expressApp = app.getHttpAdapter().getInstance()
  return serverlessExpress({ app: expressApp })
}

/**
 * Funtion that is used by the serverless to run the application in the
 * `Lambda AWS`.
 *
 * @param event defines an object that represents the lambda event.
 * @param context defines an object that represents the labmda context.
 * @param callback defiens an object that represents the lambda callback.
 */
export async function handler(
  event: unknown,
  context: Context,
  callback: Callback,
): Promise<void> {
  server = server ?? (await bootstrap())
  return server(event, context, callback)
}
