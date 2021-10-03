import { Controller } from '@nestjs/common'

import { AboutService } from './about.service'

@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}
}
