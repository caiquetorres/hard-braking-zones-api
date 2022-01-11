import { EnvService } from './env/env.service'

import { createApp } from './utils'

async function bootstrap(): Promise<void> {
  const app = await createApp()
  const envService = app.get(EnvService)
  await app.listen(envService.get('PORT') || 3000)
}
bootstrap()
