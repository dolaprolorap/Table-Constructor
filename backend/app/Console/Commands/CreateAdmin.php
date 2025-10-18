<?php

namespace App\Console\Commands;

use App\Domain\RolesEnum;
use App\Exceptions\BusinessLogicException;
use App\Exceptions\InfrastructureException;
use App\Http\Requests\Users\CreateUserRequest;
use App\Services\UserService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\App;
use Throwable;

class CreateAdmin extends Command
{
    protected $signature = 'app:create-admin';

    /**
     * @throws BusinessLogicException
     * @throws Throwable
     * @throws InfrastructureException
     */
    public function handle()
    {
        /** @var UserService $userService */
        $userService = App::make(UserService::class);

        $request = new CreateUserRequest();

        $request->login = 'admin@123';
        $request->role = RolesEnum::ADMIN->value;
        $request->last_name = 'Самый';
        $request->first_name = 'Главный';
        $request->middle_name = 'Админ';
        $request->password = '123';

        $userService->create($request);
    }
}
