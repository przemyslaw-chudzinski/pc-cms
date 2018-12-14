<?php

namespace App\Traits;

trait ModelTrait {

    /**
     * @param string $order_by
     * @return bool
     */
    private static function validateOrderByField($order_by = '')
    {
        if ($order_by === '') return false;
        foreach (self::$sortable as $item) {
            if ($order_by === $item) return true;
        }
        return false;
    }

    /**
     * @param int $number
     * @param array $with
     * @return mixed
     */
    public static function getModelDataWithPagination($number = 10, array $with = [], array $excluded_ids = [])
    {
        if ($number === false || $number === NULL ) {$number = 10;};
        $order_by = request()->query('order_by');
        $sort = request()->query('sort');

        if (!self::validateOrderByField($order_by)) {
            $order_by = self::$sortable[0];
            $sort = 'asc';
        }
        if (count($with) > 0) {
            return self::with($with)
                ->when($order_by, function($query) use ($order_by, $sort) {
                    return $query->orderBy($order_by, $sort);
                })
                ->when(count($excluded_ids) > 0, function ($query) use ($excluded_ids) {
                    return $query->whereNotIn('id', $excluded_ids);
                })
                ->paginate($number);
        }

        return self::
            when($order_by, function($query) use ($order_by, $sort) {
                return $query->orderBy($order_by, $sort);
            })
            ->paginate($number);
    }



}