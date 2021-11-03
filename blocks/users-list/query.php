<?php

require __DIR__ . '/../../' . '/vendor/autoload.php';

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

global $no_users_message;
$no_users_message = 'No Users';

function get_users_list($groups_to_include)
{
    $users = get_objects_in_term(array((int)$groups_to_include), 'group');

    // Case when a specific taxonomy term is selected but no associated users are found
    if ($groups_to_include !== 'NaN' && empty($users)) {
        return false;
    }

    // The User Query
    return new WP_User_Query(array('fields' => 'all_with_meta', 'include' => $users));
}

function create_render_script($user_query)
{
    $loader = new FilesystemLoader(__DIR__ . '/templates');
    $twig = new Environment($loader);
    $users = array();
    $output = '<div>';

    // The User Loop
    if ($user_query != false && !empty($user_query->results)) {
        foreach ($user_query->results as $user) {
            $user->data->avatar = get_avatar($user->data->ID, '150');
            $user->data->slug = $user->data->display_name;
            array_push($users, $user->data);
        }
    } else {
        return $GLOBALS['no_users_message'];
    }
    return $twig->render('users.html.twig', [
        'users' => $users
    ]);
}

function users_list_renderer($attrs)
{
    $selected = $attrs["selectedValue"];
    // Users to filter based on taxonomy
    $user_query = get_users_list($selected);
    return create_render_script($user_query);
}
