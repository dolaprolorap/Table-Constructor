<?php

declare(strict_types=1);

namespace App\Domain;

enum RolesEnum: string
{
    case ADMIN = 'admin';
    case EDITOR = 'editor';
    case VIEWER = 'viewer';
}
