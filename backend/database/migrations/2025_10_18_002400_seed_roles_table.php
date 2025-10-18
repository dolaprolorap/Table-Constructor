<?php

use App\Domain\RolesEnum;
use App\Models\Role;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    private const ROLES = [
        [
            'slug' => RolesEnum::ADMIN->value,
            'title' => 'Администратор'
        ],
        [
            'slug' => RolesEnum::EDITOR->value,
            'title' => 'Редактор'
        ],
        [
            'slug' => RolesEnum::VIEWER->value,
            'title' => 'Наблюдатель'
        ],
    ];

    public function up(): void
    {
        foreach (self::ROLES as $role) {
            Role::insert($role);
        }
    }

    public function down(): void
    {
        foreach (self::ROLES as $role) {
            Role::where('slug', $role['slug'])->delete();
        }
    }
};
