import 'server-only';

import { AUTH_COOKIE_NAME } from '@/lib/auth/jwt';

export function createOpenApiSpec(serverUrl?: string) {
   return {
      openapi: '3.1.0',
      info: {
         title: 'Bruno Gusmão API',
         version: '0.1.0',
         description:
            'Documentação Swagger/OpenAPI da API administrativa e pública do projeto brunogusmao.dev.',
      },
      servers: serverUrl ? [{ url: serverUrl }] : [],
      tags: [
         {
            name: 'Auth',
            description:
               'Endpoints de autenticação administrativa baseados em cookie HTTP-only.',
         },
      ],
      components: {
         securitySchemes: {
            AdminSessionCookie: {
               type: 'apiKey',
               in: 'cookie',
               name: AUTH_COOKIE_NAME,
               description: 'Cookie de sessão do painel administrativo.',
            },
         },
         schemas: {
            AuthLoginForm: {
               type: 'object',
               required: ['username', 'password'],
               properties: {
                  username: {
                     type: 'string',
                     description:
                        'Usuário administrativo configurado via ambiente.',
                     example: 'admin',
                  },
                  password: {
                     type: 'string',
                     format: 'password',
                     description:
                        'Senha administrativa configurada via ambiente.',
                     example: 'change-me-now',
                  },
                  next: {
                     type: 'string',
                     description:
                        'Rota interna segura para redirecionamento após login.',
                     default: '/dashboard',
                     example: '/dashboard/posts',
                  },
               },
            },
         },
         headers: {
            Location: {
               description: 'Destino do redirecionamento após a operação.',
               schema: {
                  type: 'string',
               },
            },
         },
      },
      paths: {
         '/api/auth/login': {
            post: {
               tags: ['Auth'],
               summary: 'Autentica o usuário administrativo',
               description:
                  'Valida credenciais enviadas via formulário, grava cookie HTTP-only e redireciona para a rota segura solicitada.',
               security: [],
               requestBody: {
                  required: true,
                  content: {
                     'application/x-www-form-urlencoded': {
                        schema: {
                           $ref: '#/components/schemas/AuthLoginForm',
                        },
                     },
                  },
               },
               responses: {
                  303: {
                     description:
                        'Sempre responde com redirecionamento, seja para dashboard ou de volta ao login com código de erro.',
                     headers: {
                        Location: {
                           $ref: '#/components/headers/Location',
                        },
                     },
                  },
               },
            },
         },
         '/api/auth/logout': {
            post: {
               tags: ['Auth'],
               summary: 'Encerra a sessão administrativa',
               description:
                  'Limpa o cookie HTTP-only da sessão administrativa e redireciona para a tela de login.',
               security: [
                  {
                     AdminSessionCookie: [],
                  },
               ],
               responses: {
                  303: {
                     description:
                        'Sessão encerrada com redirecionamento para /login.',
                     headers: {
                        Location: {
                           $ref: '#/components/headers/Location',
                        },
                     },
                  },
               },
            },
         },
      },
   };
}
