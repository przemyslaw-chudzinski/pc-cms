<?php

namespace App\Traits;

trait ModelTrait {

    /**
     * @param array $data
     * @param string $value
     * @return bool
     */
    public static function toggleValue(array $data, string $value)
    {
        if (!isset($data[$value])) {
            return false;
        }
        return true;
    }

    /**
     * @description use for creating new item
     * @param array $data
     * @param string $basedOn
     * @return string
     */
    public static function createSlug(array $data, string $basedOn)
    {
        if (!isset($data['slug']) || $data['slug'] === '' || empty($data['slug'] || $data['slug'] === null)) {
            return str_slug($data[$basedOn]);
        }
        return str_slug($data['slug']);
    }

    /**
     * @description use for updating item
     * @param array $data
     * @param string $basedOn
     * @return string
     */
    public static function generateSlugBasedOn(array $data, string $basedOn)
    {
        if (isset($data['generateSlug'])) {
            return str_slug($data[$basedOn]);
        } else {
            if (!isset($data['slug'])) {
                return str_slug($data[$basedOn]);
            } else {
                return str_slug($data['slug']);
            }
        }
    }

}