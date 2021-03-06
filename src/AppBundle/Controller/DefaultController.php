<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Message;
use AppBundle\Entity\Utilisateur;
use DateTime;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends Controller {

    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request) {
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', [
                    'base_dir' => realpath($this->getParameter('kernel.root_dir') . '/..') . DIRECTORY_SEPARATOR,
        ]);
    }

    /**
     * @Route("/users")
     */
    public function updateUsers() {

        return new JsonResponse($this->getDoctrine()->getRepository(Utilisateur::class)->findAll());
    }

    /**
     * @Route("/messages")
     */
    public function updateMessages() {

        return new JsonResponse($this->getDoctrine()->getRepository(Message::class)->findAll());
    }

    /**
     * @Route("/message/add")
     * @param Request $r
     */
    public function addMessage(Request $r) {
        $user = $this->getUser();
        $message = new Message();
        $message->setMessage($r->get("msg"));
        $message->setUtilisateur($user);
        $d = new DateTime();
        $d->setTimestamp(time());
        $d->format('Y-m-d H:i:s');
        $message->setHeure($d);
        $em = $this->getDoctrine()->getManager();
        $em->persist($message);
        $em->flush();
        return new Response("ok");
    }

    /**
     * @Route("/afk", name="afk")
     * @param Request $r
     */
    public function makeAfk(Request $r) {

        $em = $this->getDoctrine()->getManager();
        $user = $this->getUser();
        //Recuperation de l'user courant
        $usr = $em->find(Utilisateur::class, $user);
        //Set le boolean a true pour le statut AFK
        $usr->setAfk(1);
        //sauvegarde les changements de la propriété afk
        $em->merge($usr);
        $em->flush();
        return new Response("ok");
    }

    /**
     * @Route("/noafk", name="noafk")
     * @param Request $r
     */
    public function makeNoAfk(Request $r) {


        $em = $this->getDoctrine()->getManager();
        $user = $this->getUser();
        //Recuperation de l'user courant
        $usr = $em->find(Utilisateur::class, $user);
        //Set le boolean a true pour ne pas/plus être afk
        $usr->setAfk(0);
        //sauvegarde les changements de la propriété afk
        $em->merge($usr);
        $em->flush();
        return new Response("ok");
    }

    /**
     * @Route("/typing", name="typing")
     * @param Request $r
     */
    public function isTyping(Request $r) {

        $em = $this->getDoctrine()->getManager();
        $user = $this->getUser();

        $usr = $em->find(Utilisateur::class, $user);
        $usr->setTyping(1);

        $em->merge($usr);
        $em->flush();
        return new Response("ok");
    }

    /**
     * @Route("/notyping", name="notyping")
     * @param Request $r
     */
    public function isNoTyping(Request $r) {

        $em = $this->getDoctrine()->getManager();
        $user = $this->getUser();

        $usr = $em->find(Utilisateur::class, $user);
        $usr->setTyping(0);

        $em->merge($usr);
        $em->flush();
        return new Response("ok");
    }

}
