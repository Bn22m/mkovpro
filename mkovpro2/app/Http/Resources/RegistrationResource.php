<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RegistrationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
      //return parent::toArray($request);
      //*
      return [
        'account' => $this->account,
        'name' => $this->name,
        'surname' => $this->surname,
        'utype' => $this->utype,
        'email' => $this->email,
        'verified' => $this->verified,
        'address' => $this->address,
        'password' => $this->password,
        'created' => $this->created,
        'comments' => $this->comments,
        'reference' => $this->reference,
        'created_at' => $this->created_at,
        'updated_at' => $this->updated_at,
      ];
      //*/
      //return parent::toArray($request);
    }
}
