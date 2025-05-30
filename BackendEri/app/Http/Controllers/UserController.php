<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Get the default user role ID (3 for regular user)
        $userRole = \App\Models\Role::where('name', 'user')->first();
        if (!$userRole) {
            throw new \Exception('Default user role not found');
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password, // Store password as plain text
            'role_id' => $userRole->id,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        // Add role name to the user object for frontend
        $userData = $user->toArray();
        $userData['role'] = $user->role->name;

        return response()->json([
            'user' => $userData,
            'token' => $token
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::with('role')->where('email', $request->email)->first();

        if (!$user || $request->password !== $user->password) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        // Add role name to the user object for frontend
        $userData = $user->toArray();
        $userData['role'] = $user->role->name ?? 'user';

        return response()->json([
            'user' => $userData,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function getCurrentUser(Request $request)
    {
        $user = $request->user();
        $userData = $user->toArray();
        $userData['role'] = $user->role->name;
        return response()->json($userData);
    }

    public function getUsers()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function createUser(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role_id' => 'required|integer|exists:roles,id',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password, // Store password as plain text
            'role_id' => $request->role_id,
        ]);

        // Add role name to the user object for frontend
        $userData = $user->toArray();
        $userData['role'] = $user->role->name;

        return response()->json($userData, 201);
    }

    public function updateUser(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $id,
            'password' => 'sometimes|required|string|min:8',
            'role_id' => 'sometimes|required|integer|exists:roles,id',
        ]);

        if ($request->has('name')) {
            $user->name = $request->name;
        }
        if ($request->has('email')) {
            $user->email = $request->email;
        }
        if ($request->has('password')) {
            $user->password = $request->password; // Store password as plain text
        }
        if ($request->has('role_id')) {
            $user->role_id = $request->role_id;
        }

        $user->save();

        // Add role name to the user object for frontend
        $userData = $user->toArray();
        $userData['role'] = $user->role->name;

        return response()->json($userData);
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }
} 