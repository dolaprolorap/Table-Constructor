<?php

declare(strict_types=1);

namespace App\Domain;

enum RolesEnum: string
{
    case ADMIN = 'ADMIN';
    case EDITOR = 'EDITOR';
    case VIEWER = 'VIEWER';
}
