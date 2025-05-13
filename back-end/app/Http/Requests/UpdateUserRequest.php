<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Log;

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
        Log::info('UpdateUserRequest rules called', [
            'request_data' => $this->all()
        ]);
        
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

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation()
    {
        Log::info('UpdateUserRequest prepareForValidation', [
            'original_input' => $this->all()
        ]);
    }

    /**
     * Handle a passed validation attempt.
     */
    protected function passedValidation()
    {
        Log::info('UpdateUserRequest passedValidation', [
            'validated_data' => $this->validated()
        ]);
    }
}