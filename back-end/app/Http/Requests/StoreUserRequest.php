<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|max:50',
            'email' => 'required|email|max:255|unique:users',
            'email_verified_at' => now(),
            'password' => 'required|min:8|max:50',
            'remember_token' =>  Str::random(60),
            'ssiap_level' => ['required', Rule::in([1, 2, 3])],
            'phone_number' => 'required|digits:10|unique:users',
            'site_id' => 'required|exists:sites,id'
        ];
    }
}
