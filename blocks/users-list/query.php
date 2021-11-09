<?php

require __DIR__ . '/../../' . '/vendor/autoload.php';

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

function get_users_list($groups_to_include)
{
    $users = get_objects_in_term(array((int)$groups_to_include), 'group');

    // Case when a specific taxonomy term is selected but no associated users are found
    if ($groups_to_include !== 'NaN' && !empty($groups_to_include) && empty($users)) {
        return false;
    }

    // The User Query
    return new WP_User_Query(array('fields' => array('ID', 'display_name'), 'include' => $users));
}

function create_render_script($user_query, $selected)
{
    $loader = new FilesystemLoader(__DIR__ . '/templates');
    $twig = new Environment($loader);
    $users = array();
    $taxonomy_terms = get_terms('group');

    // The User Loop
    if ($user_query != false && !empty($user_query->results)) {
        foreach ($user_query->results as $user) {
            $user->data->avatar = get_avatar($user->ID, '150');
            $user->data->display_name = $user->display_name;
            $meta_data = get_user_meta($user->ID);
            $user->data->description = join(", ", $meta_data["description"]);
            $user->data->cc_position = join(", ", $meta_data["cc_position"]);
            array_push($users, $user->data);
        }
    }
    return $twig->render('users.html.twig', [
        'users' => $users,
        'user_groups' => $taxonomy_terms,
        'selected' => $selected,
        'no_users_message' => $GLOBALS['no_users_message'],
        'is_preview' => is_preview()
    ]);
}

function users_list_renderer($attrs)
{
    $selected = $attrs["selectedValue"];
    // Users to filter based on taxonomy
    $user_query = get_users_list($selected);
    return create_render_script($user_query, $selected);
}
