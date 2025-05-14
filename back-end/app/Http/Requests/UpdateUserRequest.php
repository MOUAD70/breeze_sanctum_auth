<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
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
            'name' => 'sometimes|required|string|max:50',
            'email' => [
                'sometimes',
                'required',
                'email',
                'max:255',
                Rule::unique('users')->ignore($this->route('user')->id),
            ],
            'phone_number' => [
                'sometimes',
                'required',
                'string',
                'digits:10',
                Rule::unique('users')->ignore($this->route('user')->id),
            ],
            'ssiap_level' => ['sometimes', 'required', 'integer', Rule::in([1, 2, 3])],
            'site_id' => 'sometimes|required|exists:sites,id',
        ];
    }
}
