import { Controller, Get } from '@nestjs/common';

@Controller('help')
export class HelpController {
  @Get()
  getHelp(): string {
    return '¡Hola! Esta es la página de ayuda de la API.';
  }
}