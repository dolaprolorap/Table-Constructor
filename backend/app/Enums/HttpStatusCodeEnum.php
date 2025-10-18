<?php

namespace App\Enums;

enum HttpStatusCodeEnum: int
{
    // 2xx
    case OK = 200;
    case CREATED = 201;
    case NON_AUTHORITATIVE_INFORMATION = 203;
    case NO_CONTENT = 204;

    // 3xx
    case SEE_OTHER = 303;

    // 4xx
    case BAD_REQUEST = 400;
    case UNAUTHORIZED = 401;
    case FORBIDDEN = 403;
    case NOT_FOUND = 404;
    case CONFLICT = 409;
    case UNPROCESSABLE_ENTITY = 422;

    // 5xx
    case INTERNAL_SERVER_ERROR = 500;
    case SERVICE_UNAVAILABLE = 503;
}
